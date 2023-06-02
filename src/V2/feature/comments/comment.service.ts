import API from "../../../utils/axios";
import { Comment } from "./comment.type";


export default class CommentService {
  static async getComments(id: string): Promise<Comment[]> {
    const res = await API.get(`posts/${id}/comment`);
    return res.data;
  }

  static async createComments(data: Comment): Promise<Comment> {
    const res = await API.post(`posts/${data.postId}/comment`, data);
    return res.data;
  }

  static async deleteComments(data:Comment): Promise<Comment> {
    const res = await API.delete(`posts/${data.postId}/comments/${data.id}`);
    return res.data;
  }
}