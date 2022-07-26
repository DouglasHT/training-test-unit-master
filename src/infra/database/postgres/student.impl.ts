import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/domain/modules/entities/student';
import { StudentRepository } from 'src/domain/repositories/student.repository';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class StudentImpl implements StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async save(payload: Student): Promise<Student> {
    try {
      payload = { ...payload, uuid: uuidv4() };

      return await this.studentRepository.save(payload);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<Student[]> {
    try {
      return await this.studentRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: number): Promise<Student> {
    try {
      return await this.studentRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
