import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Classroom } from 'src/domain/modules/entities/classroom';
import { FindByIdClassroom } from 'src/domain/modules/usecases/classroom/find-by-id';
import { GetAllClassroom } from 'src/domain/modules/usecases/classroom/get-all';
import { SaveClassroom } from 'src/domain/modules/usecases/classroom/save';

@Controller('classroom')
export class ClassroomController {
  constructor(
    private readonly saveClassroom: SaveClassroom,
    private readonly findByIdClassroom: FindByIdClassroom,
    private readonly getAllClassroom: GetAllClassroom,
  ) {}

  @Post()
  save(@Body() payload: Classroom): Promise<Classroom> {
    return this.saveClassroom.call(payload);
  }

  @Get()
  getAll(): Promise<Classroom[]> {
    return this.getAllClassroom.call();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Classroom> {
    return this.findByIdClassroom.call(id);
  }
}
