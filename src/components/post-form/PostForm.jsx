import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Input, Select, RTE } from "../index";
import databaseService from "../../appwrite/database";
import storageService from "../../appwrite/storage";
import { useForm } from "react-hook-form";

function PostForm({ post }) {
  const { handleSubmit, register, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);

  console.log({ userData });

  const onSubmit = async (data) => {
    try {
      if (post) {
        const file = data.image[0]
          ? await storageService.uploadFile(data.image[0])
          : null;

        if (file) {
          await storageService.deleteFile(post.featuredImage);
          const dbPost = await databaseService.updatePost(post.$id, {
            ...data,
            featuredImage: file.$id,
          });
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = data.image[0]
          ? await storageService.uploadFile(data.image[0])
          : null;
        if (file) {
          const dbPost = await databaseService.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.log("PostForm :: onSubmit :: error", error);
    }
  };

  const slugTransform = (value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
          onInput={(e) => {
            const titleValue = e.currentTarget.value;
            setValue("title", titleValue, { shouldValidate: true });
            setValue("slug", slugTransform(titleValue), {
              shouldValidate: true,
            });
          }}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
