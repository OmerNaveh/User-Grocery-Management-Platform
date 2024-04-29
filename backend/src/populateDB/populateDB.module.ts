import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { PopulateDbService } from './populateDB.service';
import { UserService } from 'src/users/user.service';
import { ProductService } from 'src/products/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [],
  providers: [PopulateDbService, UserService, ProductService],
})
export class PopulateDBModule {
  constructor(private readonly populateDbService: PopulateDbService) {}

  async onModuleInit() {
    await this.populateDbService.populate();
  }
}
