import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private bookRepository: Repository<Book>,
    ) {}

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    async findOne(id: number): Promise<Book> {
        if (!isValidID(id)) {
            throw new BadRequestException('Invalid ID.');
        }
        
       const book = await this.bookRepository.findOneBy({ id })

       if(!book){
        throw new NotFoundException('Book with given id is not found.')
       }

       return book
    }

    async create(bookDto: CreateBookDto): Promise<Book> {
        const book = await this.bookRepository.create({ ...bookDto });

        return this.bookRepository.save(book);
    }

    async updateOne(id: number, bookDto: UpdateBookDto): Promise<Book> {
        if (!isValidID(id)) {
            throw new BadRequestException('Invalid ID.');
        }

        const book = await this.bookRepository.findOneBy({ id })
 
        if(!book){
         throw new NotFoundException('Book with given id is not found.')
        }

        Object.assign(book, bookDto);

        return await this.bookRepository.save(book)
     }

    async deleteOne(id: number): Promise<Book> {
        if (!isValidID(id)) {
            throw new BadRequestException('Invalid ID.');
        }

        const book = await this.bookRepository.findOneBy({ id })
 
        if(!book){
         throw new NotFoundException('Book with given id is not found.')
        }
 
        await this.bookRepository.delete(id);

        return book
     }

}
function isValidID(id: number): boolean {
    if(id > 0)
    {
        return true
    }
    return false
}