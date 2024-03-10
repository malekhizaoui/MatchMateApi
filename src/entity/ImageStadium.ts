import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	JoinTable,
	ManyToOne,
} from 'typeorm';
import { Stadium } from './Stadium';

@Entity()
export class ImageStadium {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true,
	})
	designation: string;

	@Column({
		nullable: true,
	})
	legende: string;

	@Column({
		nullable: true,
	})
	imageURL: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => Stadium, (stadium) => stadium.stadiumImages)
	@JoinTable()
	stadium: Stadium;

}