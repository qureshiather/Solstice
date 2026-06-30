import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import GeneratorDiv from "components/GeneratorDiv";
import { MAPPINGS } from "utils/config-mappings";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";

type ParamTypes = {
  seedString: string;
  shapeType: keyof typeof MAPPINGS.shapeType;
  shapeBorder: keyof typeof MAPPINGS.borderType;
  resolution: keyof typeof MAPPINGS.resolution;
  backgroundType: keyof typeof MAPPINGS.backgroundType;
};

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-border/40 bg-muted/30 px-3 py-2 text-center">
    <dt className="text-xs text-muted-foreground">{label}</dt>
    <dd className="mt-0.5 text-sm font-medium">{value}</dd>
  </div>
);

export const Generate = () => {
  const [isRendering, setIsRendering] = useState(true);
  const saveRef = useRef<(() => void) | null>(null);
  const { seedString, shapeType, shapeBorder, resolution, backgroundType } =
    useParams<ParamTypes>();

  if (seedString && shapeType && shapeBorder && resolution && backgroundType) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-10 sm:px-6">
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/generator"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Back to generator"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Export</h1>
            <p className="text-sm text-muted-foreground">
              {isRendering
                ? "Rendering at full resolution…"
                : "Render complete — download when ready."}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Your artwork</CardTitle>
            <CardDescription>
              Full-resolution export from seed &ldquo;{seedString}&rdquo;
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              <MetaItem
                label="Shape"
                value={MAPPINGS.shapeType[shapeType]}
              />
              <MetaItem
                label="Border"
                value={MAPPINGS.borderType[shapeBorder]}
              />
              <MetaItem
                label="Background"
                value={MAPPINGS.backgroundType[backgroundType]}
              />
              <MetaItem
                label="Resolution"
                value={MAPPINGS.resolution[resolution].label}
              />
              <MetaItem label="Seed" value={seedString} />
            </dl>

            <div className="flex justify-center rounded-lg border border-border/40 bg-black/30 p-3">
              <GeneratorDiv
                frameClassName="canvas-frame--export"
                onRenderComplete={() => setIsRendering(false)}
                onSaveReady={(save) => {
                  saveRef.current = save;
                }}
                showDownload={false}
                BACKGROUND_TYPE={parseInt(backgroundType)}
                SHAPE_TYPE={parseInt(shapeType)}
                SHAPE_BORDER={parseInt(shapeBorder)}
                SEED_STRING={seedString}
                RESOLUTION={MAPPINGS.resolution[resolution]}
              />
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={isRendering}
              onClick={() => saveRef.current?.()}
            >
              <Download className="h-4 w-4" />
              {isRendering ? "Rendering…" : "Download PNG"}
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Invalid parameters.</p>
    </main>
  );
};
