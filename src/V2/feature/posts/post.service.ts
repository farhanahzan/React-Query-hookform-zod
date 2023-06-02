import API from '../../../utils/axios';
import { Post } from './post.types';

export default class PostsService {
  static async getPosts(): Promise<Post[]> {
    const res = await API.get(`posts`);
    return res.data;
  }
  static async getPostsPaginated(page:number): Promise<Post[]> {
    const res = await API.get(`posts`,{params:{_page:page, _limit:2}});
    return res.data;
  }

  static async getSinglePost(id: string): Promise<Post> {
    const res = await API.get(`posts/${id}`);
    return res.data;
  }

  static async createPost(data: Post): Promise<Post> {
    const res = await API.post(`posts`, data);
    return res.data;
  }

  static async updatePost(data: Post): Promise<Post> {
    const res = await API.put(`posts/${data.id}`, data);
    return res.data;
  }

  static async deletePost(id: string): Promise<Post> {
    const res = await API.delete(`posts/${id}`);
    return res.data;
  }
}
