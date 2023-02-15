import { Injectable, NotFoundException } from '@nestjs/common';
import { Catalog } from './Catalog.entity';

@Injectable()
export class CatalogService {
    
      getAllCatalogs(): Catalog[] {
        throw new NotFoundException()
    }
    
      getCatalogById(id: number): Catalog {
        throw new NotFoundException()
     }
    
      createCatalog(Catalog: any) {
        throw new NotFoundException();
      }
    
      updateCatalog(id: number, Catalog: Catalog): Catalog {
        throw new NotFoundException();
    }
    
      deleteCatalog(id: number) {
        throw new NotFoundException()
      }
}
