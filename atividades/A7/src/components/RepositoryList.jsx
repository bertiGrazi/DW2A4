import { Counter } from "./Counter";
import { RepositoryItem } from "./RepositoryItem";

const repository = {
  name: "Atividade",
  description: "Descrição da Atividade",
  link: "https://github.com/bertiGrazi/DW2A4",
};

export function RepositoryList() {
  return (
    <>
      <RepositoryItem repository={repository} />
      <Counter />
    </>
  );
}
