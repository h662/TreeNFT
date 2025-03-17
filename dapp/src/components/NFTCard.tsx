import { GridItem, Image, Text } from "@chakra-ui/react";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

const CLAIM_SECONDS = 120;

interface Metadata {
  name: string;
  description: string;
  image: string;
}

interface NFTCardProps {
  tokenId: BigInt;
  tokenURI: string;
  treeNFTContract: Contract | null;
  isOpen: boolean;
}

function NFTCard({ tokenId, tokenURI, treeNFTContract, isOpen }: NFTCardProps) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

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

      const now = Math.floor(Date.now() / 1000);

      const timeElapsed = now - Number(res);

      const isClaimable = timeElapsed >= CLAIM_SECONDS;

      setRemainingTime(isClaimable ? 0 : CLAIM_SECONDS - timeElapsed);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    if (!tokenURI) return;

    getMetadata();
  }, [tokenURI]);

  useEffect(() => {
    getLastClaimTime();
  }, [tokenId, treeNFTContract]);

  useEffect(() => {
    if (!isOpen) return;

    getLastClaimTime();
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime === null || remainingTime <= 0) return;

      setRemainingTime(remainingTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <GridItem as="li">
      <Image w={256} src={metadata?.image} alt={metadata?.name} />
      <Text textAlign="center" mt={2}>
        {remainingTime === null
          ? "로딩중"
          : remainingTime === 0
          ? "보상 가능"
          : `남은 시간 : ${formatTime(remainingTime)}`}
      </Text>
    </GridItem>
  );
}

export default NFTCard;
