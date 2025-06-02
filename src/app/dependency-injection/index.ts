import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

export const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

export async function injectDependencies(): Promise<void> {
  const applicationDependenciesFile = `${__dirname}/application.dependencies.yaml`;
  await loader.load(applicationDependenciesFile);
}
