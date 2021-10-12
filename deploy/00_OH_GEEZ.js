const fs = require("fs");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    const accounts = JSON.parse(fs.readFileSync("oh-geez.json", "utf8"));
    const leaves = accounts.map(v => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    const root = tree.getHexRoot();

    await deploy("OhGeez", {
        from: deployer,
        args: [root],
        log: true,
    });
};
