import { Heading, Link, Text, Code } from "@chakra-ui/core";

export default function Home() {
  return (
    <>
      <Heading as="h1" size="2xl" mb="2">
        Welcome to Next.js!
      </Heading>
      <Link color="teal.500" href="https://nextjs.org">
        Next.js!
      </Link>
      <Text fontSize="xl" mt="2">
        Get started by editing <Code>pages/index.js</Code>
      </Text>
    </>
  );
}
