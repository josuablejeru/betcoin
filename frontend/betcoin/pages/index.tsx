import { Heading, Link, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <VStack spacing={6}>
        <Heading as="h1" size="2xl" mb="2">
          Welcome to Betcoin!
        </Heading>
        <Link color="teal.500" href="/game">
          Start the game here!!
        </Link>
      </VStack>
    </>
  );
}
