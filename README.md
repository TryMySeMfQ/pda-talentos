# PdA Talentos

Site estático que conecta alunos e ex-alunos da ONG **Programadores do Amanhã (PdA)** a pessoas e empresas que precisam contratar programadores para projetos freelancer.

## O que o site faz

- Lista talentos formados pela PdA, com área de atuação, stack e um resultado concreto que já entregaram.
- Permite buscar por nome/tecnologia e filtrar por área.
- Ao clicar em "Entrar em contato", abre um modal com opção de falar direto no WhatsApp ou por e-mail com o talento.

## Estrutura

```
index.html          Página principal
css/style.css        Estilos
js/main.js            Lógica de listagem, busca/filtro e modal de contato
data/students.json    Dados dos talentos (edite este arquivo para adicionar/remover perfis)
assets/img/           Imagens (fotos dos talentos, placeholder)
```

## Como rodar localmente

Como o site usa `fetch` para carregar `data/students.json`, é preciso servir os arquivos por um servidor local (não abrir o `index.html` direto no navegador via `file://`).

Com Python instalado:

```
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador.

## Como adicionar um novo talento

Edite `data/students.json` e adicione um novo objeto seguindo o mesmo formato dos existentes (nome, foto, cidade, área, stack, disponibilidade, resultado concreto, bio, whatsapp, email, github, linkedin).
