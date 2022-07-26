import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Student } from 'src/domain/modules/entities/student';
import { FindByIdStudent } from 'src/domain/modules/usecases/student/find-by-id';
import { GetAllStudent } from 'src/domain/modules/usecases/student/get-all';
import { SaveStudent } from 'src/domain/modules/usecases/student/save';

@Controller('student')
export class StudentController {
  constructor(
    private readonly saveStudent: SaveStudent,
    private readonly findByIdStudent: FindByIdStudent,
    private readonly getAllStudent: GetAllStudent,
  ) {}

  @Post()
  save(@Body() payload: Student): Promise<Student> {
    return this.saveStudent.call(payload);
  }

  @Get()
  getAll(): Promise<Student[]> {
    return this.getAllStudent.call();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Student> {
    return this.findByIdStudent.call(id);
  }
}
