import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BookController {
    constructor(
        private bookService: BookService,

    ) {}

    @Get()
    async getAllBook() {
        return this.bookService.findAll()
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return this.bookService.findOne(id)
    }

    @Post()
    async createBook(@Body() body: CreateBookDto) {
        return this.bookService.create(body)
    }

    @Put(':id')
    async updateBook(@Param('id') id: number, @Body() body: UpdateBookDto) {
        return this.bookService.updateOne(id, body)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: number) {
        return await this.bookService.deleteOne(id)
    }
}
