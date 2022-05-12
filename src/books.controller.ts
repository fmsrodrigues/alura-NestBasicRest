import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from './books.model';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async index(): Promise<Book[]> {
    return this.booksService.getAll();
  }

  @Get(':id')
  async show(@Param() params): Promise<Book> {
    return this.booksService.getById(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body): Promise<Book> {
    return this.booksService.create(body);
  }

  @Put(':id')
  async update(@Body() body): Promise<Book> {
    return this.booksService.update(body);
  }

  @Delete(':id')
  async delete(@Param() params): Promise<Book> {
    return this.booksService.delete(params.id);
  }
}
