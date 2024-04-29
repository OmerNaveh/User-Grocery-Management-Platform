import { BadRequestException } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';

export async function validateDto(dto: any): Promise<void> {
  const errors: ValidationError[] = await validate(dto);
  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }
}
