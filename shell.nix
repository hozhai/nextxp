{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.pnpm
  ];

  shellHook = ''
    export NODE_ENV=development
    export IN_NIX_SHELL=1
    echo "hi!"
  '';
}
