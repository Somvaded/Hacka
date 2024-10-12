import { SessionProvider } from "next-auth/react"
import MindfulKidsPage from "./pages/HomePage"

export default function Home() {
  return (
      <main >
        <MindfulKidsPage/>
      </main>
    
  );
}
