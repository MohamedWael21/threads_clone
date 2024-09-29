"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import Image from "next/image";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

type CommentSchema = z.infer<typeof CommentValidation>;
const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();

  const form = useForm<CommentSchema>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: CommentSchema) => {
    await addCommentToThread({
      commentText: values.thread,
      threadId: threadId,
      userId: JSON.parse(currentUserId),
      path: pathname,
    });

    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment...."
                  className="no-focus text-light-1 outline-none"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="comment-form_btn"
          disabled={form.formState.isSubmitting}
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};
export default Comment;
