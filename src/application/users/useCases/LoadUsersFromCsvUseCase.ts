import {
  CreateUserAndPlayerDTO,
  ICreateUserAndPlayerUseCase,
  ILoadUsersFromCsvUseCase,
  Player,
  PlayerPosition,
} from '@/domain';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LoadUsersFromCsvUseCase implements ILoadUsersFromCsvUseCase {
  private readonly DEFAULT_PASSWORD = '12345678';

  constructor(
    @inject('CreateUserAndPlayerUseCase')
    private createUserAndPlayerUseCase: ICreateUserAndPlayerUseCase,
  ) {}

  async execute(csvData: Buffer): Promise<void> {
    const lines = csvData.toString().split('\n');
    const players: Player[] = [];

    for (let i = 1; i < lines.length; i += 1) {
      const row = lines[i].trim();

      if (row) {
        const [name, phone, nickname, age, position] = row
          .split(';')
          .map(item => item.trim());

        const dto: CreateUserAndPlayerDTO = {
          user: {
            name,
            phone,
            password: this.DEFAULT_PASSWORD,
            roles: [],
          },
          player: {
            nickname,
            age: Number(age),
            position: position as PlayerPosition,
          },
        };

        const player = await this.createUserAndPlayerUseCase.execute(dto);

        players.push(player);
      }
    }
  }
}
