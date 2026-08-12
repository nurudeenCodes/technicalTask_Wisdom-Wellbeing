import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { formatDuration } from '../../features/resources/formatDuration';
import type { Resource } from '../../types/resource';

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

interface ResourceDialogProps {
  resource: Resource | null;
  onClose: () => void;
}

export const ResourceDialog = ({ resource, onClose }: ResourceDialogProps) => (
  <Dialog open={resource !== null} onClose={onClose} maxWidth="sm" fullWidth>
    {resource && (
      <>
        <DialogTitle sx={{ pr: 6 }}>
          {resource.title}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            component="img"
            src={resource.thumbnail}
            alt=""
            sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 2, mb: 2 }}
          />

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {resource.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDuration(resource.durationMinutes, resource.category)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(resource.dateUploaded)}
            </Typography>
          </Stack>

          <Typography sx={{ mb: 2 }}>{resource.description}</Typography>

          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
            {resource.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        </DialogContent>
      </>
    )}
  </Dialog>
);