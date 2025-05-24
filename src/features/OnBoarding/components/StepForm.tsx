import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  Switch,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const steps: string[] = [
  "Participation",
  "Interests",
  "Skills",
  "Support Expectations",
  "Specific Help",
  "Join WhatsApp",
];

type FormData = {
  participation: string[];
  interests: string[];
  interestsOther: string;
  skills: string;
  support: string;
  help: string[];
  helpOther: string;
  joinWhatsApp: boolean;
};
type StepFormProps = {
  onSubmit: (data: any) => void;
};

const StepForm: React.FC<StepFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    participation: [],
    interests: [],
    interestsOther: "",
    skills: "",
    support: "",
    help: [],
    helpOther: "",
    joinWhatsApp: false,
  });

  const handleCheckboxChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => {
      const list = prev[key] as string[];
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <FormGroup>
            {[
              "Join as Core Team Member",
              "Volunteer in Programs",
              "Attend Events/Workshops",
              "Start or Expand a Business",
              "Learn New Skills",
              "Mentor Others",
            ].map((label) => (
              <FormControlLabel
                key={label}
                control={
                  <Checkbox
                    checked={formData.participation.includes(label)}
                    onChange={() =>
                      handleCheckboxChange("participation", label)
                    }
                  />
                }
                label={label}
              />
            ))}
          </FormGroup>
        );
      case 1:
        return (
          <Box>
            <FormGroup>
              {[
                "Business/Entrepreneurship",
                "Education",
                "Technology",
                "Healthcare",
                "Social Work",
                "Leadership",
                "Public Speaking",
                "Content Creation",
              ].map((label) => (
                <FormControlLabel
                  key={label}
                  control={
                    <Checkbox
                      checked={formData.interests.includes(label)}
                      onChange={() => handleCheckboxChange("interests", label)}
                    />
                  }
                  label={label}
                />
              ))}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.interests.includes("Others")}
                    onChange={() => handleCheckboxChange("interests", "Others")}
                  />
                }
                label="Others"
              />
              {formData.interests.includes("Others") && (
                <TextField
                  label="Please specify"
                  value={formData.interestsOther}
                  onChange={(e) =>
                    setFormData({ ...formData, interestsOther: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
              )}
            </FormGroup>
          </Box>
        );
      case 2:
        return (
          <TextField
            label="Skills/Expertise (optional)"
            placeholder="Graphic Design, Event Management, Accounting"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            fullWidth
            multiline
          />
        );
      case 3:
        return (
          <TextField
            label="What support do you expect from IWEP? (optional)"
            placeholder="Help starting a boutique, improving public speaking, mentorship in business."
            value={formData.support}
            onChange={(e) =>
              setFormData({ ...formData, support: e.target.value })
            }
            fullWidth
            multiline
          />
        );
      case 4:
        return (
          <FormGroup>
            {[
              "Financial Assistance",
              "Mental Health Support",
              "Career Guidance",
              "Business Mentorship",
              "Educational Scholarships",
              "Health & Wellness Guidance",
            ].map((label) => (
              <FormControlLabel
                key={label}
                control={
                  <Checkbox
                    checked={formData.help.includes(label)}
                    onChange={() => handleCheckboxChange("help", label)}
                  />
                }
                label={label}
              />
            ))}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.help.includes("Other")}
                  onChange={() => handleCheckboxChange("help", "Other")}
                />
              }
              label="Other"
            />
            {formData.help.includes("Other") && (
              <TextField
                label="Please specify"
                value={formData.helpOther}
                onChange={(e) =>
                  setFormData({ ...formData, helpOther: e.target.value })
                }
                fullWidth
                margin="normal"
              />
            )}
          </FormGroup>
        );
      case 5:
        return (
          <FormControlLabel
            control={
              <Switch
                checked={formData.joinWhatsApp}
                onChange={(e) =>
                  setFormData({ ...formData, joinWhatsApp: e.target.checked })
                }
              />
            }
            label="Would you like to join IWEP WhatsApp Community?"
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" mb={2}>
        {steps[step]}
      </Typography>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <Box mb={3}>{renderStep()}</Box>
        </motion.div>
      </AnimatePresence>
      <Box display="flex" justifyContent="space-between">
        {step !== 0 ? (
          <Button disabled={step === 0} onClick={handleBack}>
            Back
          </Button>
        ) : <Box></Box>}
        {step === steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit(formData)}
          >
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StepForm;
