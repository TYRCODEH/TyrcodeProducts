import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; // 👈 string, no UUID

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ type: 'uuid' })
  userid: string; // 👈 también string
}
