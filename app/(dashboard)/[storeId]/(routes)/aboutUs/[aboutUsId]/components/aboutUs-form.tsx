"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { AboutUs, Trustee } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  phoneNo: z.string().min(1),
  address: z.string().min(1),
  ourMembersUrl: z.string().min(1),
  trustees: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      post: z.string(),
      photoUrl: z.string(),
    })
  )
});

type AboutUsFormValues = z.infer<typeof formSchema>;

interface AboutUsFormProps {
  initialData: AboutUs & { trustees: Trustee[] } | null;
}

export const AboutUsForm: React.FC<AboutUsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit AboutUs" : "Create AboutUs";
  const description = initialData ? "Edit an AboutUs." : "Add a new AboutUs";
  const toastMessage = initialData ? "AboutUs updated." : "AboutUs created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<AboutUsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      phoneNo: "",
      address: "",
      ourMembersUrl: "",
      trustees: [],
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "trustees",
  });

  const onSubmit = async (data: AboutUsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/aboutUs/${params.aboutUsId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/aboutUs`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/aboutUs`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/aboutUs/${params.aboutUsId}`);
      router.refresh();
      router.push(`/${params.storeId}/aboutUs`);
      toast.success("AboutUs deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all AboutUs first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage>{errors.phoneNo && errors.phoneNo.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage>{errors.address && errors.address.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ourMembersUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ourMembersUrl image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="space-y-8">
            <h3 className="text-lg font-medium">Trustees</h3>
            <div>
              {fields.map((item, index) => (
                <div key={item.id} className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                    control={control}
                    name={`trustees.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage>{errors.trustees?.[index]?.name?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`trustees.${index}.post`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Enter post" {...field} />
                        </FormControl>
                        <FormMessage>{errors.trustees?.[index]?.post?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`trustees.${index}.photoUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo URL</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value ? [field.value] : []}
                            disabled={loading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange('')}
                          />
                        </FormControl>
                        <FormMessage>{errors.trustees?.[index]?.photoUrl?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => append({ name: "", post: "", photoUrl: "" })} // Add a new trustee
            >
              Add Trustee
            </Button>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};