import os

def read_and_write_all_files(output_filename="output.txt"):
    # Open the output file in write mode
    with open(output_filename, "w") as output_file:
        # List all files in the current directory
        for filename in os.listdir():
            # Make sure we're dealing with a file
            if os.path.isfile(filename):
                # Write the file name and extension to the output file
                output_file.write(f"{filename}:\n")
                
                # Open and read the contents of the file
                with open(filename, "r", encoding="utf-8", errors="ignore") as input_file:
                    contents = input_file.read()
                    output_file.write(contents + "\n")
                
                # Write a separator between files
                output_file.write("\n\n")

if __name__ == "__main__":
    read_and_write_all_files()
