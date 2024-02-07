import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [],
})
export class BlogModule {}
