import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async getAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async getById(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async create(book: Book): Promise<Book> {
    return this.bookModel.create(book);
  }

  async update(data: Book): Promise<Book> {
    const findBook = await this.getById(data.id);
    findBook.set({ ...data });
    await findBook.save();
    return findBook;
  }

  async delete(id: number): Promise<Book> {
    const book = await this.getById(id);
    book.destroy();
    return book;
  }
}
