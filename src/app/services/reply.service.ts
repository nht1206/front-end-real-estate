import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  private readonly API = 'https://rhys-api.herokuapp.com/api/v1/replies';

  constructor(private http: HttpClient) {}

  getReplies(): Observable<Array<Reply>> {
    return this.http.get<Array<Reply>>(this.API);
  }

  getRepliesByCommentId(id: number): Observable<Iterable<Reply>> {
    return this.http.get<Iterable<Reply>>(`${this.API}/${id}/comment`);
  }

  createReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(this.API, reply);
  }

  editReply(reply: Reply, replyId: number): Observable<Reply> {
    return this.http.patch<Reply>(`${this.API}/${replyId}`, reply);
  }

  deleteReply(id: number): Observable<Reply> {
    return this.http.delete<Reply>(`${this.API}/${id}`);
  }
}
