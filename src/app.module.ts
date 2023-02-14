import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './catalog/catalog.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Neo4jModule } from 'nest-neo4j/dist';

@Module({
  imports: [CatalogModule, OrderModule, AuthModule, UserModule,Neo4jModule.forRoot({
    scheme: 'neo4j+s',
    host: '2269c04c.databases.neo4j.io',
    port: 7687,
    username: 'neo4j',
    password: 'O5ubuu_kI4rFAEUjjRAHydQzz9MldtiYiFMEC7268fI',
    
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
