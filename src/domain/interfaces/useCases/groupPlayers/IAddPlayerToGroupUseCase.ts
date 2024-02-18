export namespace AddPlayerToGroup {
  export type Input = {
    userId: string;
    playerId: string;
    groupId: string;
  };
}

export interface IAddPlayerToGroupUseCase {
  execute({
    userId,
    playerId,
    groupId,
  }: AddPlayerToGroup.Input): Promise<boolean>;
}
