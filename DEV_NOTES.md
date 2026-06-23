# Paleta de cores
- #111C2E - fundo
- #5C6B82 - cinza
- #465F87 - destsque fundo 
- #CFA34B - ouro
- #D6B97E - ouro fraco
- 0764D0 - Cor BTNs


# Padrões
- Url de projetos que tenham o "force" (portflios), devem usar ?notReq=true


# Todo - Front
- Ao setar para THIS OFF = desligar também todos os IsActive

- Será que funciona o last discount?
- StartedAt? Conferir
- Novo off (agora não é mais natural via configs)

- TROCAR PARA DATE NO PRISMA

## TANSTACK
- Mutations:
````ts
 // hooks/useUpdateItem.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateItem({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const response = await fetch(`/api/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar");
  }

  return response.json();
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
}
 ````

- Usar no componente
```ts

const {
    data: servers,
    isLoading,
    error,
} = useServers();
const queryClient = useQueryClient()

    <button onClick={()=> queryClient.invalidateQueries({ queryKey: ['servers'] })}>TEstar</button>

function ItemList() {
  const {
    data: items,
    isLoading,
    error,
  } = useItems();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro</div>;
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

```
