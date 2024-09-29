import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { threads } = await fetchThreads(1, 30);

  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      {threads.length === 0 ? (
        <p className="no-result">No threads found</p>
      ) : (
        <section className="mt-9 flex flex-col gap-10">
          {threads.map((thread) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUser={user?.id || ""}
              parentId={thread.parentID}
              author={thread.author}
              content={thread.text}
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))}
        </section>
      )}
    </>
  );
}
