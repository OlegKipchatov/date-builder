import { TutorialStep } from "./tutorial-step";
import { CodeBlock } from "./code-block";

const create = `create table notes (
  id bigserial primary key,
  title text
);

insert into notes(title)
values
  ('Сегодня я создал проект Supabase.'),
  ('Я добавил данные и запросил их из Next.js.'),
  ('Получилось отлично!');
`.trim();

const rls = `alter table notes enable row level security;
create policy "Allow public read access" on notes
for select
using (true);`.trim();

const server = `import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

const client = `'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim();

export function FetchDataSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Создайте таблицы и добавьте данные">
        <p>
          Перейдите в{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{" "}
          вашего проекта Supabase, чтобы создать таблицу и добавить тестовые
          данные. Если не знаете, какие данные использовать, скопируйте код
          ниже в{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>{" "}
          и нажмите RUN.
        </p>
        <CodeBlock code={create} />
      </TutorialStep>

      <TutorialStep title="Включите Row Level Security (RLS)">
        <p>
          В Supabase RLS включён по умолчанию. Чтобы читать данные из таблицы{" "}
          <code>notes</code>, нужно добавить политику. Это можно сделать в{" "}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{" "}
          или через{" "}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>
          .
        </p>
        <p>Например, выполните следующий SQL, чтобы разрешить публичное чтение:</p>
        <CodeBlock code={rls} />
        <p>
          Подробнее о RLS — в{" "}
          <a
            href="https://supabase.com/docs/guides/auth/row-level-security"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            документации Supabase
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Запросите данные Supabase из Next.js">
        <p>
          Чтобы создать клиент Supabase и запросить данные из Async Server
          Component, создайте файл page.tsx по пути{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            /app/notes/page.tsx
          </span>{" "}
          и добавьте код ниже.
        </p>
        <CodeBlock code={server} />
        <p>Также можно использовать Client Component.</p>
        <CodeBlock code={client} />
      </TutorialStep>

      <TutorialStep title="Изучите библиотеку Supabase UI">
        <p>
          Перейдите в{" "}
          <a
            href="https://supabase.com/ui"
            className="font-bold hover:underline text-foreground/80"
          >
            Supabase UI library
          </a>{" "}
          и попробуйте установить готовые блоки. Например, блок Realtime Chat:
        </p>
        <CodeBlock
          code={
            "npx shadcn@latest add https://supabase.com/ui/r/realtime-chat-nextjs.json"
          }
        />
      </TutorialStep>

      <TutorialStep title="Соберите за выходные и масштабируйтесь до миллионов!">
        <p>Вы готовы запустить свой продукт в мир! 🚀</p>
      </TutorialStep>
    </ol>
  );
}
