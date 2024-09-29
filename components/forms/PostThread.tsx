"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import { Textarea } from "../ui/textarea";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

interface Props {
  userId: string;
}

type ThreadSchema = z.infer<typeof ThreadValidation>;
const PostThread = ({ userId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { organization } = useOrganization();

  const form = useForm<ThreadSchema>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: ThreadSchema) => {
    await createThread({
      text: values.thread,
      author: userId,
      path: pathname,
      communityId: organization ? organization.id : null,
    });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>

              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-500"
          disabled={form.formState.isSubmitting}
        >
          Post Thread
        </Button>
      </form>
    </Form>
  );
};
export default PostThread;
