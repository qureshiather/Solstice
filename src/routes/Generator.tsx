import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import GeneratorDiv from "components/GeneratorDiv";
import { RenderStatus } from "components/RenderStatus";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Select } from "components/ui/select";

const SettingField = ({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    {children}
    <p className="text-xs text-muted-foreground">{hint}</p>
  </div>
);

export const Generator = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRendering, setIsRendering] = useState(true);
  const [progress, setProgress] = useState(0);

  const [backgroundType, setBackgroundType] = useState("0");
  const [shapeType, setShapeType] = useState("1");
  const [shapeBorder, setShapeBorder] = useState("0");
  const [resolution, setResolution] = useState("0");

  const [seedString, setSeedString] = useState("REACT");
  const [seedStringError, setSeedStringError] = useState<string | undefined>();

  const [disableBorderType, setDisableBorderType] = useState(false);

  const validateSeedString = (value: string) => {
    if (value.length > 12) {
      setSeedStringError("Seed must be 12 characters or fewer");
    } else {
      setSeedString(value);
      setSeedStringError(undefined);
    }
  };

  useEffect(() => {
    if (backgroundType === "0") {
      setShapeBorder("0");
      setDisableBorderType(true);
    } else {
      setDisableBorderType(false);
    }
  }, [shapeType, backgroundType]);

  const handleBorderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (disableBorderType) {
      toast("Border unavailable with a black background", { duration: 3000 });
      return;
    }
    setShapeBorder(event.target.value);
  };

  const handlePreview = () => {
    setProgress(0);
    setIsRendering(true);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <Link
          to="/"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Generator</h1>
          <p className="text-sm text-muted-foreground">
            Tune the settings, preview live, then download.
          </p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="border-b border-border/60 p-6 lg:border-b-0 lg:border-r">
            <CardHeader className="p-0 pb-6">
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Each option shapes how your pattern is drawn.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 p-0 sm:grid-cols-2">
              <SettingField
                id="background"
                label="Background"
                hint="Solid black or gradient."
              >
                <Select
                  id="background"
                  value={backgroundType}
                  onChange={(event) => setBackgroundType(event.target.value)}
                >
                  <option value="0">Black</option>
                  <option value="1">Gradient</option>
                </Select>
              </SettingField>

              <SettingField id="shape" label="Shape" hint="Circle or square.">
                <Select
                  id="shape"
                  value={shapeType}
                  onChange={(event) => setShapeType(event.target.value)}
                >
                  <option value="1">Circle</option>
                  <option value="2">Square</option>
                </Select>
              </SettingField>

              <SettingField
                id="border"
                label="Border"
                hint="Outline for contrast."
              >
                <Select
                  id="border"
                  value={shapeBorder}
                  onChange={handleBorderChange}
                  disabled={disableBorderType}
                >
                  <option value="0">None</option>
                  <option value="1">Border</option>
                </Select>
              </SettingField>

              <SettingField
                id="resolution"
                label="Resolution"
                hint="Export size."
              >
                <Select
                  id="resolution"
                  value={resolution}
                  onChange={(event) => setResolution(event.target.value)}
                >
                  <option value="0">1080p</option>
                  <option value="1">2K</option>
                  <option value="2">4K</option>
                </Select>
              </SettingField>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="seed">Seed string</Label>
                <Input
                  id="seed"
                  value={seedString}
                  aria-invalid={seedStringError !== undefined}
                  onChange={(event) => validateSeedString(event.target.value)}
                />
                {seedStringError ? (
                  <p className="text-xs text-destructive">{seedStringError}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Same seed, same art.
                  </p>
                )}
              </div>
            </CardContent>
          </div>

          <div className="flex flex-col p-6">
            <CardHeader className="p-0 pb-4 text-center lg:text-left">
              <CardTitle>Preview</CardTitle>
              <RenderStatus
                isRendering={isRendering}
                progress={progress}
                readyText="Ready — regenerate or download."
                renderingLabel="Rendering your pattern"
              />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 p-0">
              <div className="w-fit rounded-lg border border-border/40 bg-black/30 p-1">
                <GeneratorDiv
                  key={refreshKey}
                  frameClassName="canvas-frame--preview"
                  onProgress={setProgress}
                  onRenderComplete={() => setIsRendering(false)}
                  BACKGROUND_TYPE={parseInt(backgroundType)}
                  SHAPE_TYPE={parseInt(shapeType)}
                  SHAPE_BORDER={parseInt(shapeBorder)}
                  SEED_STRING={seedString}
                  RESOLUTION={{
                    heightPx: "500",
                    widthPx: "500",
                    label: "500",
                  }}
                  showDownload={false}
                />
              </div>
              <div className="flex w-[288px] gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={handlePreview}
                  disabled={isRendering}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRendering ? "animate-spin" : ""}`}
                  />
                  Preview
                </Button>
                <Button
                  className="flex-1"
                  disabled={isRendering}
                  onClick={() => {
                    window.open(
                      `/generate/${seedString}/${backgroundType}/${shapeType}/${shapeBorder}/${resolution}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </main>
  );
};
