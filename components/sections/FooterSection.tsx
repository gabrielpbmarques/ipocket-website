import { Container } from "@/components/ui/Container";

export function FooterSection() {
  return (
    <footer className="border-t py-8 text-sm subtle muted-border">
      <Container className="flex items-center justify-between">
        <span>© {new Date().getFullYear()} iPocket Brasil</span>
        <a href="#topo" className="hover:underline cursor-pointer">Voltar ao topo</a>
      </Container>
    </footer>
  );
}
