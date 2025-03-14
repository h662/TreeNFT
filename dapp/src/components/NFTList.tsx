import { Button, Flex, Grid } from "@chakra-ui/react";
import { containerStyle } from "./Main";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";
import NFTCard from "./NFTCard";

interface NFTListProps {
  signer: JsonRpcSigner | null;
  treeNFTContract: Contract | null;
}

function NFTList({ signer, treeNFTContract }: NFTListProps) {
  const [tokenURIs, setTokenURIs] = useState<string[]>([]);
  const [myNFTs, setMyNFTs] = useState<BigInt[]>([]);

  const handleClaimRewards = async () => {
    if (!signer || !treeNFTContract) return;

    try {
      const tx = await treeNFTContract.claimRewards(myNFTs);

      const test = await tx.wait();

      console.log(test);
    } catch (error) {
      console.error(error);
    }
  };

  const getMyNFTs = async () => {
    if (!signer || !treeNFTContract) return;

    try {
      const balance = await treeNFTContract.balanceOf(signer.address);

      const nftPromises = [];
      for (let i = 0; i < Number(balance); i++) {
        nftPromises.push(
          treeNFTContract.tokenOfOwnerByIndex(signer.address, i)
        );
      }

      const nftPromisesRes = await Promise.all(nftPromises);

      const uriPromises = [];
      for (let i = 0; i < nftPromisesRes.length; i++) {
        uriPromises.push(treeNFTContract.tokenURI(nftPromisesRes[i]));
      }

      setTokenURIs(await Promise.all(uriPromises));
      setMyNFTs(nftPromisesRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyNFTs();
  }, [signer, treeNFTContract]);

  return (
    <Flex
      {...containerStyle}
      mt={12}
      flexDirection="column"
      gap={4}
      alignItems="center"
    >
      <Button colorPalette="green" onClick={handleClaimRewards}>
        수확하기
      </Button>
      <Grid
        as="ul"
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        justifyItems="center"
        gap={2}
      >
        {tokenURIs.map((v, i) => (
          <NFTCard key={i} tokenURI={v} />
        ))}
      </Grid>
    </Flex>
  );
}

export default NFTList;
