/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Log {
    constructor() {
        this.warn = console.warn;
    }
    setUp(plugin) {
        this.isDev = plugin.manifest.name.toLowerCase().contains('canary');
        if (this.isDev) {
            this.info = console.info;
        }
    }
    info(..._) {
        // empty function in non dev envs
    }
}
const log = new Log();

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 500;
const DEFAULT_BUFFER = 100;
// recursive function that calls itself to create a list of nodes and edges
// to add to the canvas
// Some notes
// - it only allows unique notes
// - it priotises notes that have a lower depth overwriting notes that already exist
function createChildren(path, resolvedLinks, depth, canvasHashes = [{}, {}], 
// the column the path is in
colNumber = 0, 
// used to keep track of how many items are in each column
colCount = {}) {
    log.info(path, depth, colNumber);
    if (!colCount[colNumber]) {
        colCount[colNumber] = 0;
    }
    let [returnedNodes, returnedEdges] = canvasHashes;
    const fileLinks = Object.keys(resolvedLinks[path] || {});
    // if returnedNodes is empty we can assume this is the first round and we add
    // it to the returnedNodes hash
    let topLevelAdded = false;
    if (Object.keys(returnedNodes).length === 0) {
        returnedNodes[path] = {
            id: path,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            y: 0,
            x: 0,
            type: 'file',
            file: path,
            color: '1',
        };
        topLevelAdded = true;
    }
    // we use this to do a comparison to make a decision about if the level
    // of the current node is lower then the previous version of the node (if exists)
    const currentLevelXValue = (DEFAULT_WIDTH + 500) * (colNumber + 1);
    for (let i = 0; i < fileLinks.length; i++) {
        const link = fileLinks[i];
        log.info(Array.from(new Array(colNumber))
            .map(() => '--')
            .join(''), colNumber, link);
        const edgeId = `${path}-${link}`;
        returnedEdges[edgeId] = {
            id: edgeId,
            fromSide: 'right',
            toSide: 'left',
            fromNode: path,
            toNode: link,
        };
        // checks that node doesn't already exist and if it does it's x (using as a
        // reresentation of level) is higher then the new node then we override it.
        // we want to prioritise notes closer to the source
        if (!returnedNodes[link] || returnedNodes[link].x > currentLevelXValue) {
            returnedNodes[link] = {
                id: link,
                width: DEFAULT_WIDTH,
                height: DEFAULT_HEIGHT,
                x: currentLevelXValue,
                y: colCount[colNumber] * (DEFAULT_HEIGHT + DEFAULT_BUFFER),
                type: 'file',
                file: link,
            };
            colCount[colNumber] = colCount[colNumber] + 1;
        }
        if (colNumber < depth) {
            const prevNodeCount = Object.keys(returnedNodes).length;
            const nextDepth = colNumber + 1;
            // before children get added we need to save the start point for this node so we can
            // easily set how its postioned amongst it's children
            const nodeYStartingPosition = (colCount[nextDepth] || 0) * (DEFAULT_HEIGHT + DEFAULT_BUFFER);
            const [childNodes, childEdges] = createChildren(link, resolvedLinks, depth, [returnedNodes, returnedEdges], nextDepth, colCount);
            const newChildrenAdded = Object.keys(childNodes).length - prevNodeCount;
            if (newChildrenAdded > 0) {
                childNodes[link].y =
                    nodeYStartingPosition +
                        calculateYPositionFromNumberOfChildren(newChildrenAdded);
            }
            else {
                // if it has no children we add a count to the next col to give it a buffer so the
                // next sibblings children doesn't take up the space
                childNodes[link].y =
                    colCount[nextDepth] * (DEFAULT_HEIGHT + DEFAULT_BUFFER);
                colCount[nextDepth] = colCount[nextDepth] + 1;
            }
            returnedNodes = Object.assign(Object.assign({}, returnedNodes), childNodes);
            returnedEdges = Object.assign(Object.assign({}, returnedEdges), childEdges);
        }
    }
    // as we added the top level node earlier we now have to position it right we get the length of
    // of the children in the highest col
    if (topLevelAdded) {
        for (let i = depth; i >= 0; i--) {
            const maxRowCount = colCount[i];
            if (maxRowCount) {
                returnedNodes[path].y =
                    calculateYPositionFromNumberOfChildren(maxRowCount);
                break;
            }
        }
    }
    return [returnedNodes, returnedEdges];
}
// TODO use this to improve orign function
function createIncomingChildren(path, resolvedLinks, canvasHashes = [{}, {}]) {
    const [returnedNodes, returnedEdges] = canvasHashes;
    if (!returnedNodes[path]) {
        log.warn('createIncomingChildren: path not in canvasHashes');
        return canvasHashes;
    }
    const fileLinks = Object.keys(resolvedLinks[path] || {}).filter((link) => !returnedNodes[link]);
    const baseY = returnedNodes[path].y;
    const yStart = baseY +
        DEFAULT_HEIGHT / 2 -
        ((fileLinks.length / 2) * DEFAULT_HEIGHT +
            ((fileLinks.length - 1) / 2) * DEFAULT_BUFFER);
    for (let i = 0; i < fileLinks.length; i++) {
        const link = fileLinks[i];
        const edgeId = `${path}-${link}`;
        returnedEdges[edgeId] = {
            id: edgeId,
            fromSide: 'right',
            toSide: 'left',
            fromNode: link,
            toNode: path,
        };
        returnedNodes[link] = {
            id: link,
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            x: 0 - (DEFAULT_WIDTH + 500),
            y: yStart + i * (DEFAULT_HEIGHT + DEFAULT_BUFFER),
            type: 'file',
            file: link,
        };
    }
    return [returnedNodes, returnedEdges];
}
const calculateYPositionFromNumberOfChildren = (childrenCount) => (DEFAULT_HEIGHT * childrenCount + DEFAULT_BUFFER * (childrenCount - 1)) / 2 -
    DEFAULT_HEIGHT / 2;
function createCanvasFromFile(activeFile, resolvedLinks, doesFileExist, createFile, openFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path: filePath, basename: fileName } = activeFile;
        const resolvedIncomingLinks = buildResolvedIncomingLinks(resolvedLinks);
        // TODO: create a combined resolved links so we're not passing two different ones
        // to the same func
        const [outgoingNodes, outgoingEdges] = createChildren(filePath, resolvedLinks, 1);
        const [incomingNodes, incomingEdges] = createIncomingChildren(filePath, resolvedIncomingLinks, [outgoingNodes, outgoingEdges]);
        const nodes = Object.values(incomingNodes);
        const edges = Object.values(incomingEdges);
        const canvas = { nodes, edges };
        log.info(canvas);
        const path = getFileName(`${fileName}.canvas`, doesFileExist);
        if (!path) {
            throw `unable to save: ${fileName}`;
        }
        const result = yield createFile(path, JSON.stringify(canvas, null, 2));
        openFile(result);
        log.info(result);
        return result;
    });
}
// buildResolvedIncomingLinks takes the outgoingResolvedLinks and flips it to
// incoming links where the top level key is the path and the record value is a
// is a record with the keys being other paths that point to it. The number value is not used
// and set to one
const buildResolvedIncomingLinks = (resolvedLinks) => {
    const resolvedIncomingLinks = {};
    Object.entries(resolvedLinks).forEach(([linker, destination]) => {
        Object.keys(destination).forEach((path) => {
            if (!resolvedIncomingLinks[path]) {
                resolvedIncomingLinks[path] = {};
            }
            resolvedIncomingLinks[path][linker] = 1;
        });
    });
    return resolvedIncomingLinks;
};
// getFileName looks for a safe file name to use and returns it.
// will take the path and add -n to the end until I finds one that doesn't
// exist
const getFileName = (path, doesFileExist) => {
    if (!doesFileExist(path)) {
        return path;
    }
    const limit = 50;
    const [name, extention] = path.split('.');
    for (let i = 0; i < limit; i++) {
        const newPath = `${name}-${i}.${extention}`;
        log.info(newPath);
        if (!doesFileExist(newPath)) {
            return newPath;
        }
    }
    return null;
};

class LinkExploderPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            log.setUp(this);
            log.info(`${this.manifest.name} Loaded`);
            this.addCommand({
                id: 'link-exploder-canvas-builder',
                name: 'Create Canvas From File Links',
                checkCallback: (checking) => {
                    if (checking) {
                        return true;
                    }
                    const activeFile = this.app.workspace.getActiveFile();
                    if (activeFile) {
                        const doesFileExist = (path) => Boolean(this.app.vault.getAbstractFileByPath(path));
                        const createFile = (path, data) => this.app.vault.create(path, data);
                        const openFile = (currentFile) => this.app.workspace.getLeaf().openFile(currentFile);
                        createCanvasFromFile(activeFile, this.app.metadataCache.resolvedLinks, doesFileExist, createFile, openFile).catch((e) => {
                            new obsidian.Notice(`Something went wrong with creating the canvas: ${e}`);
                            console.error(e);
                        });
                    }
                },
            });
            // this only appears if in dev mode, allows quick reloading with shift-cmd-R
            if (this.manifest.name.contains('Canary')) {
                this.addCommand({
                    id: 'reloadLinkExploder',
                    name: 'Reload LinkExploder (dev)',
                    callback: () => {
                        const id = this.manifest.id;
                        // @ts-ignore - for this.app.plugins
                        const plugins = this.app.plugins;
                        plugins.disablePlugin(id).then(() => plugins.enablePlugin(id));
                        new obsidian.Notice('Reloading LinkExploder');
                    },
                    hotkeys: [{ key: 'r', modifiers: ['Mod', 'Shift'] }],
                });
            }
        });
    }
    onunload() {
        log.info('unloading link exploder');
    }
}

module.exports = LinkExploderPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL2xpYi9Mb2cudHMiLCIuLi9saWIvY2FudmFzL2NhbnZhcy50cyIsIi4uL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbIlBsdWdpbiIsIk5vdGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMs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
