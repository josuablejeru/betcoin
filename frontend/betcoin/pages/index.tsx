import { Heading, Link, Text, Code } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Heading as="h1" size="2xl" mb="2">
        Welcome to Next.js!
      </Heading>
      <Link color="teal.500" href="/game">
        Start the game!!
      </Link>
      <Text fontSize="xl" mt="2">
        Get started by editing <Code>pages/index.js</Code>
      </Text>
    </>
  );
}
