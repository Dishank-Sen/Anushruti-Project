'use client';
import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  findOfficialSign,
  ISL_CHARTS,
  ISL_SOURCE_PAGE,
  ISL_DICTIONARY_FOLDER,
} from '@/lib/isl-sources';

export function OfficialCharts() {
  const [chart, setChart] = useState<'alphabet' | 'numbers' | null>(null);
  return (
    <div className="isl-chart-links">
      <Button variant="outline" onClick={() => setChart('alphabet')}>
        Official alphabet chart
      </Button>
      <Button variant="outline" onClick={() => setChart('numbers')}>
        Official number chart
      </Button>
      <Dialog
        open={chart !== null}
        onOpenChange={(open) => {
          if (!open) setChart(null);
        }}
      >
        <DialogContent className="isl-chart-dialog">
          <DialogTitle>
            {chart ? ISL_CHARTS[chart].title : 'ISL chart'}
          </DialogTitle>
          <DialogDescription>
            Published by ISLRTC, Government of India. Original figures, hosted
            by the publisher.
          </DialogDescription>
          {chart && (
            <>
              <iframe
                className="isl-chart-frame"
                src={ISL_CHARTS[chart].url}
                title={ISL_CHARTS[chart].title}
              />
              <a
                className="secondary"
                href={ISL_CHARTS[chart].url}
                target="_blank"
                rel="noreferrer"
              >
                Open full chart (PDF) <ExternalLink size={16} />
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${ISL_CHARTS[chart].video}`}
                target="_blank"
                rel="noreferrer"
              >
                Watch ISLRTC’s demonstration
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function HandSignVisual({
  signKey,
  className = '',
  size = 240,
}: {
  signKey: string;
  className?: string;
  size?: number;
  showFingerspellingStrip?: boolean;
}) {
  const sign = findOfficialSign(signKey);
  const [loaded, setLoaded] = useState<string | null>(null);
  const shown = sign && loaded === sign.fileId;
  return (
    <section
      className={`official-sign ${className}`}
      style={{ maxWidth: Math.max(size, 320) }}
      aria-label={`Indian Sign Language reference: ${signKey}`}
    >
      <strong>{sign?.term ?? signKey}</strong>
      {sign ? (
        <>
          {shown ? (
            <iframe
              className="isl-video"
              src={`https://drive.google.com/file/d/${sign.fileId}/preview`}
              title={`ISLRTC dictionary demonstration: ${sign.term}`}
              allow="fullscreen"
              allowFullScreen
            />
          ) : (
            <Button variant="outline" onClick={() => setLoaded(sign.fileId)}>
              <Play size={18} /> Watch {sign.term} in ISL
            </Button>
          )}
          <p className="isl-caption">Dictionary term: {sign.term}</p>
          <a
            href={`https://drive.google.com/file/d/${sign.fileId}/view`}
            target="_blank"
            rel="noreferrer"
          >
            Open original video <ExternalLink size={14} />
          </a>
        </>
      ) : (
        <>
          <p>No verified clip is linked for this term yet.</p>
          <a href={ISL_DICTIONARY_FOLDER} target="_blank" rel="noreferrer">
            Browse the official dictionary <ExternalLink size={14} />
          </a>
        </>
      )}
      <small>
        Source:{' '}
        <a href={ISL_SOURCE_PAGE} target="_blank" rel="noreferrer">
          ISLRTC · Government of India
        </a>
      </small>
      {!shown && sign && (
        <small>Video loads from Google Drive only when selected.</small>
      )}
    </section>
  );
}
