import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUser={user?.id || ""}
          parentId={thread.parentID}
          author={thread.author}
          content={thread.text}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <div className="" key={childItem._id}>
            <ThreadCard
              id={childItem._id}
              currentUser={user?.id || ""}
              parentId={childItem.parentID}
              author={childItem.author}
              content={childItem.text}
              community={childItem.community}
              createdAt={childItem.createdAt}
              comments={childItem.children}
              isComment
            />
          </div>
        ))}
      </div>
    </section>
  );
}
