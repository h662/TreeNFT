import { Button, Flex, Grid } from "@chakra-ui/react";
import { containerStyle } from "./Main";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { JsonRpcSigner } from "ethers";
import NFTCard from "./NFTCard";
import SuccessDialog from "./SuccessDialog";

interface NFTListProps {
  signer: JsonRpcSigner | null;
  treeNFTContract: Contract | null;
}

function NFTList({ signer, treeNFTContract }: NFTListProps) {
  const [tokenURIs, setTokenURIs] = useState<string[]>([]);
  const [myNFTs, setMyNFTs] = useState<BigInt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClaimRewards = async () => {
    if (!signer || !treeNFTContract) return;

    try {
      setIsLoading(true);

      const tx = await treeNFTContract.claimRewards(myNFTs);

      await tx.wait();

      setIsOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
    <>
      <Flex
        {...containerStyle}
        mt={12}
        flexDirection="column"
        gap={4}
        alignItems="center"
      >
        <Button
          colorPalette="green"
          onClick={handleClaimRewards}
          loading={isLoading}
          loadingText="수확중"
        >
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
            <NFTCard
              key={i}
              tokenId={myNFTs[i]}
              tokenURI={v}
              treeNFTContract={treeNFTContract}
              isOpen={isOpen}
            />
          ))}
        </Grid>
      </Flex>
      <SuccessDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Fruit 토큰 수확"
        message="수확이 완료되었습니다."
      />
    </>
  );
}

export default NFTList;
