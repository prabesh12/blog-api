import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDTO } from "./create-post.dto";

export class CreateCommentDTO  {
    comment_id:string;
    post_id: string;
    comment: string;
    user_id:string;
    user_name:string;
  }
