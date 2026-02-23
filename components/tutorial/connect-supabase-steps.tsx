import { TutorialStep } from "./tutorial-step";

export function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Создайте проект Supabase">
        <p>
          Перейдите на{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            database.new
          </a>{" "}
          и создайте новый проект Supabase.
        </p>
      </TutorialStep>

      <TutorialStep title="Укажите переменные окружения">
        <p>
          Rename the{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.example
          </span>{" "}
          в вашем приложении Next.js в{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.local
          </span>{" "}
          и заполните значениями из{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            your Supabase project&apos;s API Settings
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Перезапустите сервер разработки Next.js">
        <p>
          Возможно, потребуется остановить сервер разработки Next.js и снова выполнить{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            npm run dev
          </span>{" "}
          чтобы подгрузить новые переменные окружения.
        </p>
      </TutorialStep>

      <TutorialStep title="Обновите страницу">
        <p>
          Возможно, потребуется обновить страницу, чтобы Next.js подгрузил
          новые переменные окружения.
        </p>
      </TutorialStep>
    </ol>
  );
}
