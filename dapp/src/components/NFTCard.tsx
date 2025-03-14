import { GridItem, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Metadata {
  name: string;
  description: string;
  image: string;
}

interface NFTCardProps {
  tokenURI: string;
}

function NFTCard({ tokenURI }: NFTCardProps) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const getMetadata = async () => {
    try {
      const res = await fetch(tokenURI);
      const json = await res.json();

      setMetadata(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!tokenURI) return;

    getMetadata();
  }, [tokenURI]);

  return (
    <GridItem as="li">
      <Image w={256} src={metadata?.image} alt={metadata?.name} />
    </GridItem>
  );
}

export default NFTCard;
