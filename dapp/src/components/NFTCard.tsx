import { GridItem, Image } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

interface Metadata {
  name: string;
  description: string;
  image: string;
}

interface NFTCardProps {
  tokenId: bigint;
  tokenURI: string;
  treeNFTContract: Contract | null;
}

function NFTCard({ tokenId, tokenURI, treeNFTContract }: NFTCardProps) {
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

  const getLastClaimTime = async () => {
    if (!treeNFTContract || !tokenId) return;

    try {
      const res = await treeNFTContract.lastClaimTime(tokenId);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!tokenURI) return;

    getMetadata();
  }, [tokenURI]);

  useEffect(() => {
    getLastClaimTime();
  }, [tokenId, treeNFTContract]);

  return (
    <GridItem as="li">
      <Image w={256} src={metadata?.image} alt={metadata?.name} />
    </GridItem>
  );
}

export default NFTCard;
