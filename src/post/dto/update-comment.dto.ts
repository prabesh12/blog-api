import { PartialType } from "@nestjs/mapped-types";
import { CreateCommentDTO } from "./create-comment.dto";

export class UpdateCommentDto extends PartialType(CreateCommentDTO) {
    comment?: string;
  }