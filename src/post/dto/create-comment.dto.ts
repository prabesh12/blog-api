import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDTO } from "./create-post.dto";

export class CreateCommentDTO extends PartialType(CreatePostDTO) {
    comment_id:string;
    post_id: string;
    comment: string;
    user_id:string;
    usre_name:string;
  }