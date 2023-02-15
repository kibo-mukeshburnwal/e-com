import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Catalog } from './Catalog.entity';
import { CatalogService } from './catalog.service';
import { CatalogDTO } from './dtos/create-catalog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly CatalogService: CatalogService) {}

  @Get()
  async getAllCatalogs(): Promise<Catalog[]> {
    return this.CatalogService.getAllCatalogs();
  }

  @Post()
  async createCatalog(@Body() catalog: CatalogDTO): Promise<any> {
  //return this.CatalogService.createCatalog()  
  }

  @Put(':id')
  async updateCatalog(
    @Param('id') id: number,
    @Body() Catalog: Catalog,
  ): Promise<Catalog> {
    return this.CatalogService.updateCatalog(id, Catalog);
  }

  @Delete(':id')
  async deleteCatalog(@Param('id') id: number) {
    this.CatalogService.deleteCatalog(id);
  }
}