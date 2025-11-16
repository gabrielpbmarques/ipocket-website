import { Container } from "@/components/ui/Container";

export function FooterSection() {
  return (
    <footer className="border-t border-zinc-200/70 py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <Container className="flex items-center justify-between">
        <span>© {new Date().getFullYear()} iPocket Brasil</span>
        <a href="#topo" className="hover:underline cursor-pointer">Voltar ao topo</a>
      </Container>
    </footer>
  );
}
